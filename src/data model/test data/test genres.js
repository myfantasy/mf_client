export default {
    "/admin/library/genres/get_all_genres.json"(){
        return {
            'genres':[{
                id: 1010123,
                title: 'Полные курсы математики.',
                count_of_lo: 124,
                description:';kghjnlfgxijhnblidglihdfgliklf',
            },
            {
                id: 1010124,
                title: 'Книги В.И. Арнольда.',
                count_of_lo: 128,
                description:'Наука строится из фактов, как дом из кирпичей, но простое собрание фактов столь же мало является наукой, как куча кирпичей - домом.<br/>Анри Пуанкаре.',
                children:[{
                    id: 1010125,
                    title: 'Полные курсы математики.',
                    count_of_lo: 23,
                    description:'',
                },
                {
                    id: 1010126,
                    title: 'Полные курсы математики. часть 2',
                    count_of_lo: 23,
                    description:'',
                    children:[{
                        id:10101261,
                        title:'бла бла',
                        count_of_lo:1,
                    },
                    {
                        id:10101262,
                        title:'бла бла 2',
                        count_of_lo:1,
                    }

                    ]
                },
                {
                    id: 1010127,
                    title: 'Полные курсы математики. часть 3',
                    count_of_lo: 23,
                    description:'',
                },
                ]
            },
            {
                id: 1010133,
                title: 'Обратные и некорректные задачи. Выделено из уравнений математической физики.',
                count_of_lo: 124,
                description:'',
            },
        
        
        
        
        ]
        };
    }


}