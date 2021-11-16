import React from "react";
import shortid from 'shortid'

function App() {

  const [ tarea, setTarea ] = React.useState('')
  const [ tareas, setTareas ] = React.useState([])
  const [ modoEdicion, setModoEdicion] = React.useState(false)
  const [ id, setId] = React.useState('')
  const [ error, setError] = React.useState(null)

  
  const agregarTarea = (e) => {
    e.preventDefault()
    
    if( !tarea.trim()) {
      console.log('elemento vacio')
      setError("Escriba algo por favor")
      return 
    }
    console.log( tarea )

    setTareas( [
      ...tareas,
      {id:shortid.generate(), nombreTarea:tarea}
    ])

    setTarea('')
    setError(null)
  }

  
  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter( item => item.id !== id )
    setTareas( arrayFiltrado )
  }
    
  const editar = item => {
    console.log(item)
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }

  const editarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Elemento Vacío')
      setError('Escriba algo por favor...')
      return
    }

    const arrayEditado = tareas.map(
      item => item.id === id ? {id:id, nombreTarea:tarea} : item
      )
    
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }


  return (
    <div className="container mt-5">
      <h1 className="text-center"> CRUD Simple</h1>
      <hr/>
      

    
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>

          {
             tareas.length === 0 ? (
              <h5>No hay tareas</h5>
              ) : (    
            <table className="table">
              <thead>
                <tr>
                <th>Id</th>
                <th>Tarea</th>
                <th>Accion</th>
                </tr>
              </thead>
              <tbody>
              {
                tareas.map( item => (
                <tr key={ item.id}>
                <td>{ item.id}</td>  
                <td>{ item.nombreTarea}</td>
                <td>
                <button 
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => eliminarTarea(item.id)}>
                    Eliminar
                </button>
    
                <button 
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editar(item)}>
                    Editar
                </button>
                </td>
                </tr>
                ))
              }
              </tbody>
            </table>
            )
          }
          
        </div>

        <div className="col-4">
          <h4 className="float-right">Formulario</h4>
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>

            {
              error ? <span className="text-danger">{error}</span> : null
            }

            <input 
              type="text" 
              className="form-control mb-2" 
              placeholder="Ingrese Tarea"
              onChange={ (e) => setTarea( e.target.value )}
              value={ tarea }
            />
            <button className="btn btn-dark btn-sm btn-block" type="submit">
              {modoEdicion ? 'Actualizar' : 'Agregar'}
            </button>
          </form>
        </div>
      </div>
    
    </div>

  )
}

export default App;
