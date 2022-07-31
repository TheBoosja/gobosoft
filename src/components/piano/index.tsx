const Piano = () => {
  const Piano = () => {
    return (
      <div className='bg-black h-60 w-96 rounded-xl flex relative'>
        <WhiteKeys />
        <BlackKeys />
      </div>
    )
  }

  const WhiteKeys = () => {
    const Key = () => {
      return <div className='bg-white rounded-xl' />
    }
    return (
      <div className='h-5/6 mt-auto grid grid-flow-col gap-2 w-full p-2'>
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
        <Key />
      </div>
    )
  }

  const BlackKeys = () => {
    const Key = ({ hidden }: { hidden?: boolean }) => {
      let classNames = 'bg-black'
      if (hidden) {
        classNames += ' bg-transparent pointer-events-none'
      }

      return <div className={classNames} />
    }
    return (
      <div
        className='absolute h-[55%] inset-x-11
                      grid grid-cols-6 gap-6'
      >
        <Key />
        <Key />
        <Key hidden />
        <Key />
        <Key />
        <Key />
      </div>
    )
  }
  return (
    <div className='grid place-items-center bg-slate-200 h-screen'>
      <Piano />
    </div>
  )
}

export default Piano
