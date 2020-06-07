import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { uuid } from 'uuidv4';

const prisma = new PrismaClient();

class PointsController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const point = {
      id: uuid(),
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    };

    await prisma.points.create({
      data: point,
    });

    return response.json(point);
  }
}

export default PointsController;
