
import React, {useEffect, useRef, useReducer} from 'react';

export default function SideBar(props) {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [recipe, setRecipe] = React.useState();

    const [fermentables, setFermentables] = React.useState();

  useEffect(() => {
        // Create a new recipe
        window.globalRecipe = new window.Brauhaus.Recipe({
            name: 'Test Recipe',
            batchSize: 20.0,
            ibuMethod: 'tinseth'
        })
        setRecipe(window.globalRecipe);
  }, []);

const addFermentable = () => {



 debugger;

    window.globalRecipe.add('fermentable', {
        name: 'Extra pale extract',
        weight: 4.0,
        color: 2.5,
        yield: 75.0
    })

    setRecipe(window.globalRecipe);
    forceUpdate();
}


    return (
    <aside>
        <h2>Recipe Output</h2>
        <p>{props.recipe && props.recipe.name ? props.recipe.name : 'no name'}</p>
        <p>{props.recipe && props.recipe.style ? props.recipe.style : 'no style'}</p>
        <p>{props.recipe && props.recipe.substyle ? props.recipe.substyle : 'no sub style'}</p>

        <p>{props.recipe && props.recipe.fermentables.length > 0 ? `${props.recipe.fermentables[0].name} ${props.recipe.fermentables[0].weight}` : 'no fermentables'}</p>
        <button onClick={addFermentable}>Add Fermentable</button>
    </aside>
    );
}
