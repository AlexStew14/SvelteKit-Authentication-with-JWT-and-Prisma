import {JWT_ACCESS_SECRET} from "$env/static/private";
import db from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createUser(email, password) {
  try {
    const user = await db.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 12)
      }
    });

    const token = jwt.sign({id: user.id, email: user.email}, JWT_ACCESS_SECRET, {
      expiresIn: '1d'
    });

    return {token};
  } catch (error) {
    return error;
  }
}

export async function loginUser(email, password) {
  try {
    const user = await db.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return {error: 'User not found'};
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return {error: 'Invalid password'};
    }

    const token = jwt.sign({id: user.id, email: user.email}, JWT_ACCESS_SECRET, {
      expiresIn: '1d'
    });

    return {token};
  } catch (error) {
    return error;
  }
}
