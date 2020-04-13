import React,{Component} from 'react';
import {
  FlatList,
  View,
  Text,
  StatusBar,
  StyleSheet,Modal,TouchableOpacity,TextInput
} from 'react-native';
import {getDatafromapi} from '../provider/services';
export default class Home extends Component
{
    pagecount=0;
    arrayholder=[];
    constructor(props)
    {
      
        super(props);
        this.state={
            storylist:[],
            visible:false,
            modalitem:"",
            
        }
    }
    componentDidMount()
    {
       this.getStorylist(this.pagecount);

this.timer=setInterval(()=>{
this.pagecount=this.pagecount+1;
  this.getStorylist(this.pagecount)
 },10000)

       
    }
    componentWillUnmount()
    {
        clearInterval(this.timer)
    }

getStorylist(count)
{
    getDatafromapi(count).then((response)=>{
       
        this.setState({storylist:[...this.state.storylist,...response.hits]})
        this.arrayholder=[...this.arrayholder,...response.hits]
    })
}

 showmodal(item){
        this.setState({visible:true,modalitem:JSON.stringify(item)})
    }
    filter(text){
        console.log(text)
      const newdata=  this.arrayholder.filter(item=>{
            const itemdata=item.title.toUpperCase()
            const textData=text.toUpperCase();
            return itemdata.indexOf(textData)>-1
        })
        console.log(newdata)
        this.setState({storylist:newdata})
    }
    
    render()
    {
        
        return <View>
            
            <FlatList
            data={this.state.storylist}
            renderItem={({item})=>
            {
               return <TouchableOpacity style={styles.listcontainer} onPress={this.showmodal.bind(this,item)}>
            <Text> {item.title}
            </Text>
             <Text>{item.url}</Text>
             <Text>{item.author}</Text>
             <Text>{item.created_at}</Text>
             </TouchableOpacity>
            
            }}
            ItemSeparatorComponent={()=><View style={styles.separator}></View>}
            keyExtractor={(item,index)=>index.toString()}
            ListHeaderComponent={()=><TextInput onChangeText={text=>this.filter(text)}></TextInput>}
            ></FlatList>
            <Modal
        transparent={false}
        visible={this.state.visible}
        onRequestClose={()=>this.setState({visible:false})}
            >
            <TouchableOpacity onPress={()=>this.setState({visible:false})} style={styles.modalstyle}>
                <Text>{this.state.modalitem}</Text>
            </TouchableOpacity>
        </Modal>
        </View>
    }
    
}
const styles=StyleSheet.create({
    listcontainer:{
        backgroundColor:"#e5e5e5",padding:16
    },
    separator:{
        height:2,
        backgroundColor:"black"
    },
    modalstyle:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"green"
    }
})
 