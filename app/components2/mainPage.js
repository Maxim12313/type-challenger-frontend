export function Page() {
  return (
    <App/>
  );
}

export function App() {
  return (
    <div className="text-center pt-10 h-screen">
      <Banner/>
      <TextArea/>
      <HelpFooter/>
    </div>
  )
}

export function TextArea() {
  return (
    <main className="h-4/6 flex flex-col place-content-center items-center border-2">
        <div className="h-5/6 border-2 w-10/12">
          TextArea
        </div>
        <div className="">
          <button>
            Restart button
          </button>
        </div>
    </main>
  )
}

export function Banner() {
  return (
    <div className="h-1/6">
      <div>Banner</div>
      
      <div className="float-left">
        <ul>
          Navigation
          <li>Back</li>
        </ul>
      </div>
    </div>
  )
}

export function HelpFooter() {
  return (
    <div className="h-1/6">
      KEY HELP
    </div>
  )
}