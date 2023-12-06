const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function updateFavorite(itemToFav) {

    console.log("called update favorite function");
  
    const FAV_URL = BASE_URL + "/userFavouriteItems/";
    const supabaseToken = localStorage.getItem('supabaseToken');
  
    
    const response = await (
    await fetch(
        FAV_URL,
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${supabaseToken}`,
        }
        }
    )
    ).json();

    if (response.error) {
    console.log('error = ' + response.error);
    }

    else {
    
    const isItemInList = response.some(item => item.id === itemToFav.id)

    const action = isItemInList ? "remove" : "add";

    const actionURL = `${BASE_URL}/userFavouriteItems/${action}`;
    try {
        
        const putResponse = await (
            await fetch(
                actionURL,
                {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${supabaseToken}`,
                },
                body: JSON.stringify([itemToFav.id])
                }
            )
            ).json();
    
        console.log("putResponse status code: ", putResponse);
        console.log(action === 'add' ? 'Added to favorites' : 'Removed from favorites');
        
        if (putResponse) {
            await localStorage.setItem('userFavorites', JSON.stringify(putResponse));
        }
            
            
        
        
        
    } catch(e) {
        console.error('Error updating favorites:', e);
    } 
    

    }
    
  };