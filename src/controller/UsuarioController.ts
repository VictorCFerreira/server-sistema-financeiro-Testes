import { Between, FindOptionsWhere, TypeORMError } from "typeorm";
import { AppDataSource } from "../persistence/data-source";
import { Request, Response } from "express";
import { Usuario } from "../entity/Usuario";

class UsuarioControler {
  public async index(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(Usuario);
    let objs;
    try {

      try {
        objs = await repository.find();

        return response.json(objs);
      } catch (error: any) {
        console.error(error);
        return response.status(500).json({ message: error.message });
      }
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }

  public async save(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(Usuario);
    if (request.body.id && request.body.id <= 0) {
      request.body.id = null;
    }
    try {
      const obj = await repository.save(request.body);
      request.headers["id-object"] = obj.id;
      return response.status(201).json(obj);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }

  public async show(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(Usuario);
    const { id } = request.params;

    if (!id) {
      return response
        .status(400)
        .json({ message: "Parâmetro ID não informado" });
    }
    try {
      const found = await repository.findOne({
        where: { id: id as any },
      });
      if (!found) {
        return response.status(404).json({ message: "Recurso não encontrado" });
      }
      return response.json(found);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }

  public async remove(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(Usuario);
    try {
      const { id } = request.params;

      if (!id) {
        return response
          .status(400)
          .json({ message: "Parâmetro ID não informado" });
      }

      const found = await repository.exist({
        where: {
          id: Number(id),
        } as FindOptionsWhere<Usuario>,
      });

      if (!found) {
        return response.status(404).json({ message: "Recurso não encontrado" });
      }

      const obj = { id: Number(id) };
      await repository.remove([obj as Usuario]);

      return response.status(204).json();
    } catch (e) {
      const error = e as TypeORMError;
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new UsuarioControler();
