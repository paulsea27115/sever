import User from '../models/User.mjs'
import Post from '../models/Post.mjs'
import { encryptPassword } from '../utils/encryptPassword.mjs'

const path = '/login'
const method = 'post'
const handler = async (req, res) => {
    const { id, password: originalPassword } = req.body

    // console.log(id, originalPassword)

    const user = await User.findOne({
        id,
        password: encryptPassword(originalPassword, id)
    })

    if (user === null) {
        return res.redirect('/login?message=아이디와 비밀번호가 일치하지 앖습니다.')
    }
    
    req.session._id = user._id.toString()
    
    return res.redirect('/boards')
}

export { path, method, handler }