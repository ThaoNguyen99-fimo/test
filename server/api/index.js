import express from "express";
import UserData from "../model/users";
import { sign } from "jsonwebtoken";
import { hashSync } from "bcrypt";
import { compare } from 'bcrypt';
const router = express.Router();

router.get("/", (req, res) => {
  UserData.find({}, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
router.post("/delete", (req, res) => {
  console.log("delete");
  let id = req.body.id;
  UserData.remove({ _id: id }, (err, result) => {
    if (err) console.log(err);
    else {
      res.send(result);
    }
  });
});
router.post("/createUser", (req, res) => {
  console.log("create");
  let name = req.body.name;
  let username = req.body.username;
  let email = req.body.email;
  let password = hashSync(req.body.password, 10);

  UserData.create(
    { name, username, email, password },
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});
router.post("/updateUser", (req, res) => {
  console.log("update");
  let id = req.body.id;
  let name = req.body.name;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  UserData.findOneAndUpdate(
    { _id: id },
    { name: name, username: username, email: email, password: password },
    { new: true },
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  UserData.find({ email: email}, (err, result) => {
    if (err) console.log(err);
    else {
      if (result.length > 0) {
        compare(password, result[0].password, (err, isMatch) => {
            if(err) console.log(err)
            else {
                if(isMatch == true){
                    const payload = { email: result[0].email, username: result[0].username };
                    const access_token = sign(payload, "SECRET");
                    res.cookie('usercookie' , access_token, {expire : 24 * 60 * 60 * 1000 });
                    res.send(access_token)
                }else{
                    res.send({ message: "Wrong email or password", status: "fail" });
                }
            }
        })
      } else {
        res.send({ message: "Wrong email or password", status: "fail" });
      }
    }
  });
});
module.exports = router;
