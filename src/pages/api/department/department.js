import { DepartmentController } from "@/core/controller";

export default async function handler(req, res) {
  switch(req.method){
    case "GET":
      const data = await DepartmentController.getAllData()
      res.json(data);
  }
}