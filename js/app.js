document.addEventListener('DOMContentLoaded', function()
{

    const form=document.getElementById('itemForm');
    const itemsTableBody=this.getElementById('itemsTableBody');

    form.addEventListener('submit', function(event)
    {    
        event.preventDefault();

        const formData=new FormData(form);
        const itemId=formData.get('id');

        const data={
            id: formData.get('id'),
            titulo: formData.get('titulo'),
            fecha_publicacion: formData.get('fecha_publicacion'),
            genero: formData.get('genero'),
            num_paginas: formData.get('num_paginas'),
            sinopsis: formData.get('sinopsis'),
            autor: formData.get('autor'),
            editorial: formData.get('editorial'),
        };

        if (itemId)
        {
            updateItem(data);
        }
        else
        {
            createItem(data);
        }

    });

    function createItem(data)
    {
        fetch('https://final24145.deffo.com.ar/api/api.php',
            {
                method: 'POST',
                heathers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response=>
            {
                if(!response.ok)
                {
                    throw new Error('La respuesta de la red no fue correcta');
                }
                return response.json();
            })
            .then(result=> {
                console.log('Exito: ', result);
                loadItems();
                form.reset();
            })
            .catch(error=>{
                console.error('Error:', error);
                alert('Error ingresando el item');
            });

    }

    function updateItem(data)
    {
        fetch(`https://final24145.deffo.com.ar/api/api.php?id=${data.id}`,
            {
                method: 'PUT',
                heathers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response=>
            {
                if(!response.ok)
                {
                    throw new Error('La respuesta de la red no fue correcta');
                }
                return response.json();
            })
            .then(result=> {
                console.log('Exito: ', result);
                loadItems();
                form.reset(); 
                document.getElementById('id').value='';
            })
            .catch(error=>{
                console.error('Error:', error);
                alert('Error ingresando el item');
            });

    }
    function loadItems()
    {
        fetch('https://final24145.deffo.com.ar/api/api.php')
        .then(response=>response.json())
        .then(data=>{
            itemsTableBody.innerHTML='';
            if(data.libros)
            {
                data.libros.forEach(libro=>{
                    const row=document.createElement('tr');
                    row.innerHTML=`
                    <td>${libro.id}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.fecha_publicacion}</td>
                    <td>${libro.genero}</td>
                    <td>${libro.num_paginas}</td>
                    <td>${libro.sinopsis}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.editorial}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteItem(${libro.id})">Eliminar</button>
                    </td>
                    <td>
                        <button class="btn btn-success" onclick="editItem(
                        ${libro.id},
                        '${libro.titulo}',
                        '${libro.fecha_publicacion}',
                        '${libro.genero}',
                        '${libro.num_paginas}',
                        '${libro.sinopsis}',
                        '${libro.autor}',
                        '${libro.editorial}')">Editar</button>
                    </td>                
                    `;
                    itemsTableBody.appendChild(row);
                });
            }
            else
            {
                console.log("No hay libros");
            }
        })
        .catch(error=>console.error('Error: ',error));   
    }

    function deleteItem(id)
    {
        fetch(`https://final24145.deffo.com.ar/api/api.php?id=${id}`,
        {
            method: 'DELETE',
            heathers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>
        {
            loadItems();           
        })

    }

    window.editItem=function(id, titulo, fecha_publicacion, genero, num_paginas, sinopsis, autor, editorial)
    {
        document.getElementById('id').value=id;
        document.getElementById('titulo').value=titulo;
        document.getElementById('fecha_publicacion').value=fecha_publicacion;
        document.getElementById('genero').value=genero;
        document.getElementById('num_paginas').value=num_paginas;
        document.getElementById('sinopsis').value=sinopsis;
        document.getElementById('autor').value=autor;
        document.getElementById('editorial').value=editorial;


    };

    window.deleteItem = deleteItem;
    loadItems();

});