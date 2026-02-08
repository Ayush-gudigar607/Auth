import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { clerkMiddleware,requireAuth,clerkClient,getAuth } from '@clerk/express'

const app = express()

app.use(cors()) // Enable CORS for all routes
app.use(express.json()) // Parse JSON bodies
app.use(clerkMiddleware())

app.get('/user', async(req, res) => {
    const { isAuthenticated,userId } = getAuth(req)

    if (!userId || !isAuthenticated) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
   // User is authenticated
    const user=await clerkClient.users.getUser(userId)

    res.json({ message: `Hello, ${user.firstName}! This is a protected route.` })
})


const port = process.env.PORT || 3000
    
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})