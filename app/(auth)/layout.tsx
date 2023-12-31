const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="w-full min-h-screen justify-evenly">
        {children}
      </div>
    )
  }
  
  export default Layout