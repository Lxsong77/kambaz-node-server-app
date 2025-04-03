import Database from "../Database/index.js";
import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
    app.delete("/api/modules/:moduleId", async (req, res) => {
      const { moduleId } = req.params;
      const status = await modulesDao.deleteModule(moduleId);
      res.send(status);
    });
    // app.put("/api/modules/:moduleId", async (req, res) => {
    //   const { moduleId } = req.params;
    //   const moduleUpdates = req.body;
    //   const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    //   res.send(status);
    // });
    app.put("/api/modules/:moduleId", async (req, res) => {
      try {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        
        if (!moduleUpdates) {
          return res.status(400).send("Missing module updates");
        }
        
        const updatedModule = await modulesDao.updateModule(moduleId, moduleUpdates);
        res.json(updatedModule);
      } catch (error) {
        res.status(404).send(error.message);
      }
    });

  
  }



