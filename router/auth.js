import express from "express";
import * as authController from "../controller/auth.js";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";
import { logout } from "../controller/auth.js"

const router = express.Router();

const validateLogin = [
  body("email").trim().isEmail().withMessage("이메일 형식으로 입력"),
  body("login_password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("비밀번호 8자 이상 입력"),
  validate,
];

const validateSignup = [
  ...validateLogin, // 기존 로그인 검증 포함
  body("login_password_confirm")
    .trim()
    .isLength({ min: 8 })
    .withMessage("비밀번호는 8자 이상이어야 합니다."),
  body("manager_name")
    .trim()
    .notEmpty()
    .matches(/^[a-zA-Z0-9가-힣]*$/)
    .isLength({ min: 2, max: 10 })
    .withMessage("이름은 2자 이상 10자 이내여야 합니다."),
  body("phone_number")
    .trim()
    .isLength({ min: 11, max: 11 })
    .matches(/^[0-9]+$/)
    .withMessage("휴대폰 번호는 11자리 숫자만 입력해야 합니다."),
];

// 회원가입
router.post("/signup", validateSignup, authController.signup);

// 로그인
router.post("/login", validateLogin, authController.login);

// 로그인 유지
router.get("/me", isAuth, authController.me);

// 사용자 로그아웃
router.post('/logout',logout)

// 이메일 찾기
router.post("/find-email", authController.findEmailController);

// 비밀번호 찾기 (임시 비밀번호 메일링)
router.post("/find-password", authController.sendResetPasswordEmail);

// 비밀번호 변경
router.post("/update-password", isAuth, authController.correctPassword);

// 매니저 설정 페이지 정보
router.post("/manager-info", authController.getManagerInfo);

export default router;
