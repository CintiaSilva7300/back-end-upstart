const router = require("express").Router();
const Person = require("../models/person");

var cors = require('cors')
router.use(cors())

router.post("/", async (req, res) => { //create
  const { name, email, password, age } = req.body;

  if (!name || !email || !password || !age) {
    res.status(422).json({ error: "Preencha todos os campos!" });
    return;
  }

  const person = {
    name,
    email,
    password,
    age,
  };

  try {
    await Person.create(person);
    res.status(201).json({ msg: "Cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  //get
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {//get id

  const id = req.params.id; //estraindo o dado da requisiçao

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ message: "Usuario não encontrada!" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {//update
  const id = req.params.id;
  const { name, email, password, age } = req.body;

  const person = {
    name,
    email,
    password,
    age,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ msg: "Usuario não encontrada!" });
      return;
    }
    res.status(200).json(person);
  } catch (error) {}
});

router.delete("/:id", async (req, res) => { //delete
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });
  if (!person) {
    res.status(422).json({ msg: "Usuario não encontrada!" });
    return;
  }
  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ msg: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;