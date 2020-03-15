"use strict";

const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const { getTURNCredentials } = require("../utils/credentials");

router.post(
  "/credenciales",
  [
    check("username")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("Campo usuario es requerido.")
      .isLength({ min: 6 })
      .withMessage("Campo usuario debe tener más de 5 caracteres."),
    check("static_auth_secret")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("Campo static_auth_secret es requerido."),
    check("time_limit")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("Campo time_limit es requerido.")
      .isInt({ min: 1, allow_leading_zeroes: false })
      .withMessage("Campo time_limit debe ser un número entero mayor a 0.")
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
  (req, res) => {
    return res
      .status(201)
      .json(
        getTURNCredentials(
          req.body.username,
          req.body.static_auth_secret,
          Number(req.body.time_limit)
        )
      );
  }
);

module.exports = router;
