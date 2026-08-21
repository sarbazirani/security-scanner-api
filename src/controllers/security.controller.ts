import { Request,Response } from "express";
import asyncHandler from "../utils/async-handler";

export const setCookie= asyncHandler(
    async (req,res)=>{
        res.cookie("demo_session", "test-session", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60,
        });

        res.status(200).json({
            message: "Cookie set successfully",
        });
});
export const deleteCookie= asyncHandler(
    async (req,res)=>{
        res.clearCookie("demo_session", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        res.status(200).json({
            message: "Cookie deleted successfully",
        });
}); 