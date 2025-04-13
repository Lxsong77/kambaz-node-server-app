import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(status);
    });

    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        try {
            const { assignmentId } = req.params;
            const status = await assignmentsDao.deleteAssignment(assignmentId);
            res.send(status);
        } catch (error) {
            res.status(404).send(error.message);
        }
    });

    app.post("/api/courses/:cid/assignments", async (req, res) => {
        try {
            const { cid } = req.params;
            const newAssignment = {
                ...req.body,
                course: cid,
            };

            const createdAssignment = await assignmentsDao.createAssignment(newAssignment);
            res.json(createdAssignment);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    app.get("/api/courses/:cid/assignments", async (req, res) => {
        try {
            const { cid } = req.params;
            const assignments = await assignmentsDao.findAssignmentsForCourse(cid);
            res.json(assignments);
        } catch (error) {
            res.status(404).send(error.message);
        }
    });

}