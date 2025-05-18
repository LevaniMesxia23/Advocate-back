import { Request, Response } from "express"
import Team from "../models/Team"
import { teamSchema } from "../validators/team"

export const getAllTeams = async (req: Request, res: Response) => {
  const members = await Team.find().sort({createdAt: -1})
  res.status(200).json(members)
}

export const getSingleTeam = async (req: Request, res: Response) => {
  const member = await Team.findById(req.params.id)
  if(!member){
    res.status(404).json({message: "Member not found"})
    return
  }
  res.status(200).json(member)
}

export const createTeam = async (req: Request, res: Response) => {
  const created = await Team.create(req.body)
  res.status(201).json(created)
}

export const updateTeam = async(req: Request, res: Response) => {
  const updated = await Team.findByIdAndUpdate(req.params.id, req.body, {new:true})
  if(!updated){
    res.status(404).json({message: "Member not found"})
    return
  }
  res.status(200).json(updated)
}

export const deleteTeam = async (req: Request, res: Response) => {
  const deleted = await Team.findByIdAndDelete(req.params.id)
  if(!deleted){
    res.status(404).json({message: "Member not found"})
    return
  }
  res.status(200).json({message: "Member deleted successfully"})
}

