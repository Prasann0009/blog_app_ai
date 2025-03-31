import jwt from "jsonwebtoken";
import Token from "../models/TokenModel.js";
const { TokenExpiredError } = jwt;
const SECRET_KEY = process.env.JWT_SECRET_KEY;

export function generateToken(user) {
  return jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1Hour" });
}

export async function authenticateMiddleware(req, res, next) {
  const authHeaders = req.header("authorization");
  const token = authHeaders && authHeaders.split(" ")[1];

  // if (!token) {
  //   return {
  //     message: "Token is not available please login again",
  //     status: 400,
  //   };
  // }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    //check if the token is present in the cache
    const tokenInstance = await Token.findOne({ userId: decoded.userId });
    if (!tokenInstance || tokenInstance.token !== token) {
      //token is not present in the cache hence ask the user to re login
      return res
        .status(401)
        .json({ message: "Invalid user! please login again" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    // console.log(error);
    if (error instanceof TokenExpiredError) {
      console.log("token is expired");
    }
    res.status(401).json({ message: "Login expired! Please login agian" });
  }
}
