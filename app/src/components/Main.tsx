import { useAuth } from '../contexts/AuthContext'
import Connect from './Connect'
import SendMail from './SendMail'

export default function Main() {
  const { user } = useAuth()

  if (!user) {
    return <div className="page-wrapper"><Connect /></div>
  }

  return <div className="page-wrapper"><SendMail /></div>
}
