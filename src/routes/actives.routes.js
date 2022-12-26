import { Router } from "express"
import * as activeCtrl from "../controllers/actives.controller"
import { validateActive, verifyToken } from "../middlewares/authJwt"

const router = Router()

/**
 * @openapi
 * /actives:
 *   get:
 *     tags:
 *       - [Actives]
 *     summary: Gets all people
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Active"
 * 
 *   post:
 *     tags:
 *       - [Actives]
 *     summary: Create new active
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
 *                 example: Honda Civic SI 2022
 *               description:
 *                 type: string
 *                 example: Carro semideportivo
 *               personId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Active"
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
 * /actives/{id}:
 *   get:
 *     tags:
 *       - [Actives]
 *     summary: Get active by ID
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
 *                 $ref: "#/components/schemas/Active"
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
 *                   example: "Active not found"
 * 
 *   put:
 *     tags:
 *       - [Actives]
 *     summary: Update active by ID
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
 *                 example: Honda Civic SI 2022
 *               description:
 *                 type: string
 *                 example: Carro semideportivo
 *               personId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/Active"
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
 *                   example: "Active not found"
 * 
 *   delete:
 *     tags:
 *       - [Actives]
 *     summary: Delete active by ID
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
 *                   example: "1 Active deleted"
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
 *                   example: "Active not found"
 */

router.get("/", activeCtrl.getActives)
router.get("/:id", activeCtrl.getActiveById)
router.post("/", [validateActive, verifyToken], activeCtrl.createActive)
router.put("/:id", [validateActive, verifyToken], activeCtrl.updateActiveById)
router.delete("/:id", verifyToken, activeCtrl.deleteActiveById)

export default router