import express from "express";
import { JSONFilePreset } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";

import { body, validationResult } from "express-validator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "", "db.json");

const app = express();
app.use(express.json());

//need full path dirname to access db.json
const defaultData = {
  "accounts": [],
};

const db = await JSONFilePreset(filePath, defaultData);

//TODO: Validates that nickname and accountType are provided and that savingsGoal is a positive number if provided
//since this isn't relly part of the requirements for this assignment, I used an out of the box validation library express-validator to handle the validation logic.
//This allows us to easily define validation rules for each field and return informative error messages if the validation fails.
//we can add more validation rules here as needed, for example we could validate that accountType is one of a set of allowed values or that nickname is unique among existing accounts.
//For now, we will keep it simple and just check for presence and basic format.
const validateUserData = [
  body("nickname").notEmpty().withMessage("Nickname is required"),
  body("accountType").notEmpty().withMessage("Type is required"),
  //savingsgoal is optional but if provided must be a positive number
  body("savingsGoal").optional().isFloat({ gt: 0 }).withMessage("Savings goal must be a positive number"),
];

app.get("/api/accounts", (req, res) => {
  const accounts = db.data.accounts;
  if (accounts) {
    res.json(accounts);
  } else {
    res.status(404).json({ error: "Accounts not found" });
  }
});

// Custom route handler with validation
app.post("/api/accounts", validateUserData, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const newAccount = {
      id: Date.now(), // Generate a simple unique ID based on timestamp sicne we don't have a database auto-incrementing ID
      nickname: req.body.nickname,
      accountType: req.body.accountType,
      savingsGoal: req.body.savingsGoal,
    };
    db.data.accounts.push(newAccount); // Add the new account to the in-memory data
    db.write(); // Write the updated data back to db.json
    res.status(201).json(newAccount); // Return the newly created account as JSON
  }
});

export default app;
