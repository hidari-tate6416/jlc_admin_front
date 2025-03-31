function SmallButton({func, children}) {
  return (
    <button onClick={ func } class="bg-green-500 hover:bg-green-600 rounded-md text-white w-full py-3">
      { children }
    </button>
  )
}

export default SmallButton;