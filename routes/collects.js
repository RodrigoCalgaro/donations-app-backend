const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = passport.authenticate("jwt", { session: false });
const isAdmin = require('./../helpers/authorize');
const collectController = require('./../controllers/collectController');

/* COLLECT SCHEMA */
/**
* @swagger 
* components:
*   schemas:
*       Collect:
*           type: object
*           required: 
*               - collectId         
*               - startsDate          
*               - endsDate          
*               - targetAmount           
*           properties: 
*               collectId:           
*                   type: integer           
*                   description: Primary Key.       
*               startsDate:           
*                   type: string
*                   format: date                   
*               endsDate:           
*                   type: string
*                   format: date                   
*               targetAmount:           
*                   type: number                              
*               minDonationAllowed:           
*                   type: number                              
*               suggestedDonation:           
*                   type: number                              
*/


/* GET COLLECT API */
/**
* @swagger 
* /api/collects:
*   get:
*       summary: Get collect info
*       tags: [Collect]
* 
*       responses:
*           200:
*               description: collect info
*               content:
*                   application/json:    
*                       schema:    
*                           type: object    
*                           required:          
*                               - collectId          
*                               - startsDate          
*                               - endsDate          
*                               - targetAmount          
*                               - totalDonors          
*                               - totalRaised          
*                               - stillNeeded          
*                               - percentageRaised          
*                               - remainingDays          
*                           properties:                         
*                               collectId:           
*                                   type: integer                   
*                               startsDate:           
*                                   type: string
*                                   format: date                   
*                               endsDate:           
*                                   type: string
*                                   format: date                   
*                               targetAmount:           
*                                   type: number                              
*                               minDonationAllowed:           
*                                   type: number                              
*                               suggestedDonation:           
*                                   type: number    
*                               totalDonors:           
*                                   type: integer    
*                               totalRaised:           
*                                   type: number    
*                               stillNeeded:           
*                                   type: number    
*                               percentageRaised:           
*                                   type: number    
*                               remainingDays:           
*                                   type: integer    
*           500:
*               description: Internal Error
*/
router.get('/', collectController.get)

/* UPDATE COLLECT API */
/**
* @swagger 
* /api/collects:
*   put:
*       summary: Update collect info
*       tags: [Collect]
*       requestBody:
*           required: true
*           content:
*               application/json:    
*                   schema:    
*                       $ref: '#/components/schemas/Collect' 
*       responses:
*           200:
*               description: collect updated
*               content:
*                   application/json:    
*                       schema:    
*                           $ref: '#/components/schemas/Collect'  
*           401:
*               description: Unauthorized
*           500:
*               description: Internal Error
*/
router.put('/', authenticate, isAdmin, collectController.update)


module.exports = router;