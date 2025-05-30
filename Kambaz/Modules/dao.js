import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// export function updateModule(moduleId, moduleUpdates) {
//   const { modules } = Database;
//   const module = modules.find((module) => module._id === moduleId);
//   Object.assign(module, moduleUpdates);
//   return module;
// }
export function updateModule(moduleId, moduleUpdates) {
  const { modules } = Database;
  const moduleIndex = modules.findIndex((module) => module._id === moduleId);
  if (moduleIndex === -1) {
    throw new Error("Module not found");
  }
  if (!moduleUpdates || typeof moduleUpdates !== 'object') {
    throw new Error("Invalid module updates");
  }
  modules[moduleIndex] = { ...modules[moduleIndex], ...moduleUpdates };
  return modules[moduleIndex];
}

export function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    Database.modules = [...Database.modules, newModule];
    return newModule;
  }
  
export function findModulesForCourse(courseId) {
  const { modules } = Database;
  return modules.filter((module) => module.course === courseId);
}

export function deleteModule(moduleId) {
  const { modules } = Database;
  Database.modules = modules.filter((module) => module._id !== moduleId);
 }





