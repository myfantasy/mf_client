<template>
    <div class="flexColStartStretch">
        <div class="flexRowBWStretch">
            <h1>Жанры</h1>
            <div class="actions_area">
                <materialbutton type='flat' v-on:click="expand()">Раскрыть все</materialbutton>
                <materialbutton type='flat' v-on:click="collapse()">Свернуть все</materialbutton>

            </div>
        </div>
        <div class="content_wrapper">
            <div class="content_only_center">
                <ul class="collapsible popout" data-collapsible="expandable" ref='ul'>
                    <li v-for="genre in genres" :key="genre.id">
                        <div class="collapsible-header">
                            <div>
                            {{genre.title}}<span class="gengre_count_of_lo">{{genre.count_of_lo}}</span><a class="actionLink" href="#">Перейти в раздел</a>
                            </div>
                            <i class="material-icons oncollapsed">expand_more</i>
                            <i class="material-icons onexpanded">expand_less</i>
                        </div>
                        <div class="collapsible-body">
                            <div style="text-align:center; margin-bottom:20px;" v-html="genre.description">
                            </div>


                            <collapsible collapsible="expandable" v-show="genre.children && genre.children.length != 0">
                                <li v-for="childgenre in genre.children" :key="childgenre.id">
                                    <div class="collapsible-header">
                                        <div>{{childgenre.title}}<span class="gengre_count_of_lo">{{childgenre.count_of_lo}}</span>
                                        <a class="actionLink" href="#">Перейти в раздел</a>
                                        </div>
                                            <i class="material-icons oncollapsed">expand_more</i>
                                            <i class="material-icons onexpanded">expand_less</i>
                                    </div>
                                    <div class="collapsible-body">

                                        <ul class="genres_flat_list" v-show="childgenre.children && childgenre.children.length != 0">
                                            <li v-for="grandchild in childgenre.children" :key="grandchild.id"><a href="#">{{grandchild.title}}</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </collapsible>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import button from '@/components/controls/button';
import collapsible from '@/components/controls/collapsible';
import genres from '@/data model/genres'

export default {
    name: 'genres',
    components:{
        'materialbutton':button,
        'collapsible':collapsible
    },
    data () {
        return { 
            genres:[],
        };
    },
    methods:{
        refreash(){
            genres.load_all_genres()
            .then(loaded => {
                this.genres = loaded;
                    
                console.log($(this.$el).find(".collapsible"));
                $(this.$el).find(".collapsible").collapsible();
            })
            .catch(error => showError(this.$options.name, 'refreash', 'Не удалось загрузить жанры', error));

        
        },
        expand(){
            expandAll($(this.$refs.ul));
        },
        collapse(){
            collapseAll($(this.$refs.ul));
        }
    },
    mounted(){
        this.refreash();

    }
};

    function expandAll(root) {

        $.each(root.children(), function (index, itm) {
            if (!$(itm).hasClass('active')) {
                root.collapsible('open', index);
            }

            $.each($(itm).find(".collapsible"), function (index, rootItm) {
                expandAll($(rootItm));
            });
        });

    }
    function collapseAll(root) {
        $.each(root.children(), function (index, itm) {
            if ($(itm).hasClass('active')) {
                root.collapsible('close', index);
            }

            $.each($(itm).find(".collapsible"), function (index, rootItm) {
                collapseAll($(rootItm));
            });
        });
    }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.actions_area{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
}

.gengre_count_of_lo{
    margin-left:20px;
    margin-right:20px;
    font-size:12px;
    font-style: italic;
    color:gray;
}
.collapsible-header{
    display: flex;
    justify-content: space-between;
    .oncollapsed, .onexpanded{
        margin: 0px;
        color:gray;
    }


    .onexpanded{        
        display: none;        
    }
    .oncollapsed{
        display: flex;        
    }
    &.active{
        .onexpanded{
            display: flex;
        }
        .oncollapsed{
            display: none;
        }   
    }
}
</style>
