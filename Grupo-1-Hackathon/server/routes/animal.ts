import express from "express";
import {
    CreateAnimal,
    DeleteAnimal,
    ReadAllAnimalType,
    ReadAnimalById,
    UpdateAnimal,
} from "../services/animal";
export const router = express.Router();

// adicionar animal
router.post("/", async (req, res) => {
    const body = req.body;
    const id = await CreateAnimal(body);

    if (id === "1") {
        res.status(400).json({ message: "employee number already taken" });
        return
    }
    res.status(200).json({ message: "created successfully", id: id });
});

// get data do animal por especie
router.get("/species/:animal", async (req, res) => {
    const animal = req.params.animal;
    const animals = await ReadAllAnimalType(animal);

    res.status(200).json({ animals });
});

router
    .route("/:id")

    // get data do animal pelo _id
    .get(async (req, res) => {
        const id = req.params.id;
        const data = await ReadAnimalById(id);

        if (!data) {
            res.status(404).json({ message: "page not found" });
        }

        res.status(200).json(data);
    })

    // editar animal
    .patch(async (req, res) => {
        const id = req.params.id;
        const data = await ReadAnimalById(id);
        const body = req.body;

        if (!data) {
            res.status(404).json({ message: "page not found" });
        }

        await UpdateAnimal(id, body);
        res.status(200).json({ message: "editado com sucesso" });
    })

    // apagar animal
    .delete(async (req, res) => {
        const id = req.params.id;
        await DeleteAnimal(id);
        res.status(200).json({ message: "removido com sucesso" });
    });
