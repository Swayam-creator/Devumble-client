import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer data-theme="synthwave" className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4  fixed bottom-0">
       <aside>
        <p> &copy; CopyRight {new Date().getFullYear()} - Devumble - Made with ❤️ by Prolifier</p>
       </aside>
      </footer>
    </div>
  )
}

export default Footer
