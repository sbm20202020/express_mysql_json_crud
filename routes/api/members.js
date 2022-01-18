const express = require("express");
const uuid = require("uuid");
const router = express.Router();

const members = require("../../data_members");
//Get all members
router.get("/", (req, res) => {
  res.json(members);
});

//Get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ message: `No member found with id ${req.params.id}` });
  }
});

//Create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res
      .status(400)
      .json({ msg: "Please enter name and email before pass" });
  }
  members.push(newMember);
  // console.log(req.body.not_api);
  if (!req.body.not_api) {
    res.json(members);
  } else {
    res.redirect("/");
  }
});

//Update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updMemb = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMemb.name ? updMemb.name : member.name;
        member.email = updMemb.email ? updMemb.email : member.email;
        res.json({ msg: "Member updated", member: member });
      }
    });
  } else {
    res
      .status(400)
      .json({ message: `No member found with id ${req.params.id}` });
  }
});

//Delete member
router.delete("/:id", (req, res) => {
  const member = members.filter(
    (member) => member.id === parseInt(req.params.id)
  );
  if (member[0]) {
    res.json({ msd: "member deleted", members: members });
  } else {
    res
      .status(400)
      .json({ message: `No member found with id ${req.params.id}` });
  }
});
module.exports = router;
