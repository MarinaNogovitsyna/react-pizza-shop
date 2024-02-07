import React, { FC, useEffect, useState } from 'react';
import AddPizzaForm from '../components/AddPizzaForm';
import Pizza from '../modals/Pizza';
import DisplayPizzas from '../components/DisplayPizzas';

const HomeFeature: FC = () => {
  const [pizzasList, setPizzasList] = useState<Pizza[]>([]);

  const addPizza = (newPizza: Pizza) => {
    const newPizzaList = [...pizzasList, newPizza]
    setPizzasList(newPizzaList)
    localStorage.setItem('pizzasState', JSON.stringify(newPizzaList))
  }

  const updatePizza = (newPizza: Pizza) => {
    const newPizzaList = pizzasList.map(pizza => (
      pizza.id === newPizza.id ? newPizza : pizza
    ))
    setPizzasList(newPizzaList);
    localStorage.setItem('pizzasState', JSON.stringify(newPizzaList))
  }

  const deletePizza = (id: number) => {
    const newPizzaList = pizzasList.filter(pizza => pizza.id !== id)
    setPizzasList(newPizzaList)
    localStorage.setItem('pizzasState', JSON.stringify(newPizzaList))
  }

  useEffect(() => {
    const pizzasState = localStorage.getItem('pizzasState')
    if (pizzasState){
      setPizzasList(JSON.parse(pizzasState))
    }
  }, [])
  
  return (
    <div className="App">
      <div className='wrap'>
        <span className='heading'>Pizza</span>
        <AddPizzaForm 
          addPizza={addPizza}
        />

        <DisplayPizzas 
          pizzasList={pizzasList}
          updatePizza={updatePizza}
          deletePizza={deletePizza}
        />
      </div>
    </div>
  );
}

export default HomeFeature;
