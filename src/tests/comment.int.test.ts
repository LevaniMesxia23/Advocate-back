import request from 'supertest'
import app from '../server'
import { createTestAdmin } from './utils/createTestAdmin'
import Blog from '../models/Blog'
import mongoose from 'mongoose'

let token: string
let blogId: string
let commentId: string








