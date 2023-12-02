import ThemeSwitcher from "./themeSwitcher"

export default function Navigation() {
  return (
    <>
      <div className="py-4 top-0 z-50 w-full bg-opacity-75 backdrop-blur-lg">
        <div className="flex justify-between container">
          <div>
            <div>
              <div className="sm:flex">
                <div>
                </div>
              </div>
            </div>
          </div>
          {/* desktop Menu */}
          <div className="hidden md:flex gap-1"> {/* Hide on small screens */}
            
            <ThemeSwitcher/>
          </div>
          {/* Mobile Phone Menu */}
          <div className='md:hidden mr-2 block '>


            <ThemeSwitcher/>


          </div>
        </div>
      </div>
    </>

  );
}