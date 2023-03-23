import AllIntegrations from './AllIntegrations'
import Connect from './Connect'
import SendMail from './SendMail'

export default function Main() {

  return <div className="page-wrapper"><Connect /><AllIntegrations /><SendMail /></div>
}
