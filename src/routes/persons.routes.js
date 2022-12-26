import { Router } from "express"
import * as personCtrl from "../controllers/persons.controller"
import { validatePerson, verifyToken } from "../middlewares/authJwt"

const router = Router()

/**
 * @openapi
 * /persons:
 *   get:
 *     tags:
 *       - [People]
 *     summary: Gets all people
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Person"
 * 
 *   post:
 *     tags:
 *       - [People]
 *     summary: Create new Person
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token to be passed as a header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               age:
 *                 type: integer
 *                 example: 20
 *               gender:
 *                 type: string
 *                 example: Hombre
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Person"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Name, Age or Gender is required"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token is required or invalid"
 *
 * /persons/{id}:
 *   get:
 *     tags:
 *       - [People]
 *     summary: Get person by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Person"
 * 
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Person not found"
 * 
 *   put:
 *     tags:
 *       - [People]
 *     summary: Update person by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: User ID
 *       - name: token
 *         in: header
 *         description: token to be passed as a header
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               age:
 *                 type: integer
 *                 example: 20
 *               gender:
 *                 type: string
 *                 example: Hombre
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/Person"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token is required or invalid"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Person not found"
 * 
 *   delete:
 *     tags:
 *       - [People]
 *     summary: Delete person by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: User ID
 *       - name: token
 *         in: header
 *         description: token to be passed as a header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "1 person deleted"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token is required or invalid"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Person not found"
 */

router.get("/", personCtrl.getPersons)
router.get("/:id", personCtrl.getPersonById)
router.post("/", [validatePerson, verifyToken], personCtrl.createPerson)
router.put("/:id", [validatePerson, verifyToken], personCtrl.updatePersonById)
router.delete("/:id", verifyToken, personCtrl.deletePersonById)

export default router