import {
  getAllTareas,
  getListaTareasByUserId,
} from "../services/ai.service.js";
import { AppError } from "../errors/error.js";

export const listarTodasTareas = async (req, res, next) => {
  try {
    const tareas = await getAllTareas();

    if (tareas.length === 0) {
      console.log("No hay tareas guardadas");
      throw new AppError("No hay tareas guardadas", 404);
    }

    console.log("Tareas");
    console.log(tareas);
    console.log("Tareas total: ", tareas.length);

    res.status(200).json({ tareas });
  } catch (err) {
    next(err);
  }
};

export const listarTareasPorUsuarioId = async (req, res, next) => {
  try {
    const tareas = await getListaTareasByUserId(req.params.id);

    if (tareas.length === 0) {
      throw new AppError(`No hay tareas del usuario - ${req.params.id}`, 404);
    }

    console.log("TAREAS USER id - ", req.params.id);
    console.log(tareas);

    res.status(200).json({ tareas });
  } catch (err) {
    next(err);
  }
};
