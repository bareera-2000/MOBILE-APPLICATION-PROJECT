import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Constants from 'expo-constants';
import { Input, Icon } from 'react-native-elements';
import { Fontisto } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { DataTable, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const users = require("./users.json");

const firebaseConfig = {
  apiKey: 'AIzaSyC5Iv3duRMOw8tw9UcZMCPsaC2l3LU4pYk',
  authDomain: 'mad-semester.firebaseapp.com',
  databaseURL: 'https://mad-semester-default-rtdb.firebaseio.com',
  projectId: 'mad-semester',
  storageBucket: 'mad-semester.appspot.com',
  messagingSenderId: '978420651963',
  appId: '1:978420651963:web:8e1085e2c838fe2849969e',
  measurementId: 'G-J26TBZ5WYN',
};

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// signup Login 

function LoginScreen({ navigation, route }) {
  return (
    <View style={styles.container_login}>
      <ScrollView style={styles.scrollview}>
        <Avatar.Image
                size={300}
                source={require('./assets/organize.png')}
                style={{ backgroundColor: 'rgba(0,0,0,0)', alignSelf:'center' }}
              />
        <View style={styles.logincontainer}>
          <TextInput
            style={styles.logintextinput}
            placeholder="Email"></TextInput>
          <TextInput
            style={styles.logintextinput}
            placeholder="Password"></TextInput>
          <TouchableOpacity style={styles.loginbtn}>
            <Text style={styles.loginbtntext}>Login</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={styles.logincontbottom}>
            <TouchableOpacity
              style={styles.loginbtn}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text style={styles.loginbtntext}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginbtn}
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Text style={styles.loginbtntext}>Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SignupScreen({ navigation, route }) {
  return (
    <View style={styles.container_login}>
      <ScrollView style={styles.scrollview}>
        <Avatar.Image
                size={300}
                source={require('./assets/organize.png')}
                style={{ backgroundColor: 'rgba(0,0,0,0)', alignSelf:'center' }}
              />
        <View style={styles.logincontainer}>
          <TextInput
            style={styles.logintextinput}
            placeholder="Email"></TextInput>
          <TextInput
            style={styles.logintextinput}
            placeholder="Password"></TextInput>
          <TextInput
            style={styles.logintextinput}
            placeholder="Confirm Password"></TextInput>
          <TouchableOpacity style={styles.loginbtn}>
            <Text style={styles.loginbtntext}>Signup</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={styles.logincontbottom}>
            <TouchableOpacity
              style={styles.loginbtn}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.loginbtntext}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginbtn}
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Text style={styles.loginbtntext}>Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


//Main account Screen
function AccountScreen({navigation}) {
  return (
    <View style={styles.container_account}>
      <View style={{ marginTop: 90 }}>
        <Text style={styles.name}>Account Name</Text>
        <Text style={styles.username}>Username</Text>
        <Text style={styles.username}>Email</Text>
        <Text style={styles.username}>Mobile#</Text>
        <Text style={styles.username}>Phone#</Text>
      </View>

      <TouchableOpacity style={styles.button_logout} onPress={() => {
                navigation.pop();
              }}>
        <Text style={styles.button_label}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// Sub-accounts Screen
function SubAccountsMainScreen({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Sub Accounts">
      <Stack.Screen
        name="Sub Accounts"
        component={SubAccountsScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2eb82e',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Add Sub Account"
        component={AddNewSubAccountScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2eb82e',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function SubAccountsScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState('');
  var json = null;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        'https://mad-semester-default-rtdb.firebaseio.com/subaccounts.json'
      );
      json = await response.json();
      console.log(json);

      // setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setData([]);
      setLoading(false);
      for (let key in json) {
        console.log(json[key]);
        let item = json[key];
        data.push(json[key]);
        // setData([...data, json[key]]);
        setUpdate(key);
      }
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getSubaccounts = async () => {
    try {
      const response = await fetch(
        'https://mad-semester-default-rtdb.firebaseio.com/subaccounts.json'
      );
      json = await response.json();
      console.log(json);

      // setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      for (let key in json) {
        console.log(json[key]);
        let item = json[key];
        data.push(json[key]);
        // setData([...data, json[key]]);
        setUpdate(key);
      }
    }
  };

  useEffect(() => {
    getSubaccounts();
  }, [data]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Add Sub Account');
          }}>
          <Text style={{ fontSize: 20, color: 'white', paddingRight: 25 }}>
            +
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  async function deleteItem(id) {
    try {
      const response = await fetch(
        'https://mad-semester-default-rtdb.firebaseio.com/subaccounts.json'
      );
      json = await response.json();
      console.log(json);

      // setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      try {
        for (let key in json) {
          if (id == json[key].id) {
            console.log('delete');
            let res = await fetch(
              `https://mad-semester-default-rtdb.firebaseio.com/subaccounts/${key}.json`,
              {
                method: 'DELETE',
              }
            );
          }
        }
      } catch (err) {}
    }
  }

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container_emp}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ height: 20 }}></View>
        {data.map((item) => (
          <View style={styles.empbox}>
            <View style={{ flexDirection: 'row' }}>
              <Avatar.Image
                size={70}
                source={require('./assets/man.png')}
                style={{ backgroundColor: 'rgba(0,0,0,0)' }}
              />
              <View>
                <Text style={styles.empname}>{item.name}</Text>
                <Text style={styles.empemail}>{item.role}</Text>
                <Text style={styles.empemail}>{item.email}</Text>
              </View>
              <View
                style={{
                  alignContent: 'center',
                  alignItems: 'flex-end',
                  flex: 1,
                }}>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Ionicons name="ios-trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function AddNewSubAccountScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const add = () => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        id: Math.random(),
        name: name,
        email: email,
        password: password,
        role: role,
      }),
    };

    fetch(
      'https://mad-semester-default-rtdb.firebaseio.com/subaccounts.json',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log('error', error));

    navigation.navigate('Sub Accounts');
  };
  return (
    <View style={styles.container}>
      <View style={styles.container_add}>
        <Text style={styles.font1}>Add a new Sub Account</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Role"
          onChangeText={setRole}
        />

        <TouchableOpacity style={styles.button_add} onPress={add}>
          <Text style={styles.button_label}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Files Screen section
function FilesScreenMain({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Files">
      <Stack.Screen
        name="Files"
        component={FilesScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2eb82e',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Results"
        component={ListResultsScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2eb82e',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Add File"
        component={AddNewFileScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2eb82e',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Add Result"
        component={AddNewResultScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2eb82e',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function FilesScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState('');
  var json = null;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        'https://mad-semester-default-rtdb.firebaseio.com/files.json'
      );
      json = await response.json();
      console.log(json);

      // setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setData([]);
      setLoading(false);
      for (let key in json) {
        console.log(json[key]);
        let item = json[key];
        data.push(json[key]);
        // setData([...data, json[key]]);
        setUpdate(key);
      }
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getFiles = async () => {
    try {
      const response = await fetch(
        'https://mad-semester-default-rtdb.firebaseio.com/files.json'
      );
      json = await response.json();
      console.log(json);

      // setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      for (let key in json) {
        console.log(json[key]);
        let item = json[key];
        data.push(json[key]);
        // setData([...data, json[key]]);
        setUpdate(key);
      }
    }
  };

  useEffect(() => {
    getFiles();
  }, [data]);

  async function deleteItem(id) {
    try {
      const response = await fetch(
        'https://mad-semester-default-rtdb.firebaseio.com/files.json'
      );
      json = await response.json();
      console.log(json);

      // setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      try {
        for (let key in json) {
          if (id == json[key].id) {
            console.log('delete');
            let res = await fetch(
              `https://mad-semester-default-rtdb.firebaseio.com/files/${key}.json`,
              {
                method: 'DELETE',
              }
            );
          }
        }
      } catch (err) {}
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Add File');
          }}>
          <Text style={{ fontSize: 20, color: 'white', paddingRight: 25 }}>
            +
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container_files}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <Text style={styles.item_text}>Sr#</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.item_text}>Name</Text>
          </DataTable.Title>

          <DataTable.Title numeric>
            <Text style={styles.item_text}>Delete</Text>
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView
          style={{ height: '90%' }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            data.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Results', item);
                }}>
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>
                    <Text style={styles.item_text2}>{index + 1}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.item_text2}>{item.name}</Text>
                  </DataTable.Cell>

                  <DataTable.Cell numeric>
                    <TouchableOpacity onPress={() => deleteItem(item.id)}>
                      <Ionicons name="ios-trash" size={24} color="red" />
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </DataTable>
    </View>
  );
}

function ListResultsScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState('');
  var json = null;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        'https://mad-semester-default-rtdb.firebaseio.com/results.json'
      );
      json = await response.json();
      console.log(json);

      // setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setData([]);
      setLoading(false);
      for (let key in json) {
        console.log(json[key]);
        let item = json[key];
        data.push(json[key]);
        // setData([...data, json[key]]);
        setUpdate(key);
      }
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getResults = async () => {
    try {
      const response = await fetch(
        'https://mad-semester-default-rtdb.firebaseio.com/results.json'
      );
      json = await response.json();
      console.log(json);

      // setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      for (let key in json) {
        console.log(json[key]);
        let item = json[key];
        if (route.params.id == json[key].fileid) {
          data.push(json[key]);
        }

        // setData([...data, json[key]]);
        setUpdate(key);
      }
    }
  };

  useEffect(() => {
    getResults();
  }, [data]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Add Result', route.params.id);
          }}>
          <Text style={{ fontSize: 20, color: 'white', paddingRight: 25 }}>
            +
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  async function deleteItem(id) {
    try {
      const response = await fetch(
        'https://mad-semester-default-rtdb.firebaseio.com/results.json'
      );
      json = await response.json();
      console.log(json);

      // setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      try {
        for (let key in json) {
          if (id == json[key].id) {
            console.log('delete');
            let res = await fetch(
              `https://mad-semester-default-rtdb.firebaseio.com/results/${key}.json`,
              {
                method: 'DELETE',
              }
            );
          }
        }
      } catch (err) {}
    }
  }

  return (
    <View style={styles.container_files}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <Text style={styles.item_text}>Sr#</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.item_text}>Template</Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text style={styles.item_text}>Count</Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text style={styles.item_text}>Delete</Text>
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView
          style={{ height: '90%' }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {isLoading ? (
            <ActivityIndicator />
          ) : data.length == 0 ? (
            <Text style={styles.name}>No Contents</Text>
          ) : (
            data.map((item, index) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>
                  <Text style={styles.item_text2}>{index + 1}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.item_text2}>{item.template}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text style={styles.item_text2}>{item.count}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <TouchableOpacity onPress={() => deleteItem(item.id)}>
                    <Ionicons name="ios-trash" size={24} color="red" />
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            ))
          )}
        </ScrollView>
      </DataTable>
    </View>
  );
}

function AddNewFileScreen({ navigation }) {
  const [name, setName] = useState('');

  const add = () => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        id: Math.random(),
        name: name,
        contents: [],
      }),
    };

    fetch(
      'https://mad-semester-default-rtdb.firebaseio.com/files.json',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log('error', error));
    navigation.navigate('Files');
  };
  return (
    <View style={styles.container}>
      <View style={styles.container_add}>
        <Text style={styles.font1}>Add a new File</Text>

        <Text style={styles.label}>Name</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter File Name"
          onChangeText={setName}
        />

        <TouchableOpacity style={styles.button_add} onPress={add}>
          <Text style={styles.button_label}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AddNewResultScreen({ navigation, route }) {
  const [template, setTemplate] = useState('');
  const [count, setCount] = useState('');

  const add = () => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        id: Math.random(),
        template: template,
        count: count,
        fileid: route.params,
      }),
    };

    fetch(
      'https://mad-semester-default-rtdb.firebaseio.com/results.json',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log('error', error));
    navigation.pop();
  };
  return (
    <View style={styles.container}>
      <View style={styles.container_add}>
        <Text style={styles.font1}>Add a new Result</Text>

        <Text style={styles.label}>Template Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Template Name"
          onChangeText={setTemplate}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Count"
          onChangeText={setCount}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button_add} onPress={add}>
          <Text style={styles.button_label}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Graph Screen section

function GraphScreen() {
  const [isLoading, setLoading] = useState(true);
  const [temp, setTemp] = useState([]);
  const [temp2, setTemp2] = useState([]);
  var result = [];
  temp.reduce(function (res, value) {
    if (!res[value.template]) {
      res[value.template] = { template: value.template, count: 0 };
      temp2.push(res[value.template]);
    }
    res[value.template].count += parseInt(value.count);
    return res;
  }, {});

  const values = temp2.map((item) => {
    return item.count;
  });

  const labels = temp2.map((item) => {
    return item.template;
  });

  let json;

  const getResults = async () => {
    try {
      const response = await fetch(
        'https://mad-semester-default-rtdb.firebaseio.com/results.json'
      );
      json = await response.json();
      console.log(json);

      // setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      for (let key in json) {
        temp.push({ template: json[key].template, count: json[key].count });
        // if("Wood" == json[key].template){
        //   values[0] += parseInt(json[key].count);
        // }
        // if("Beams" == json[key].template){
        //   values[1] += parseInt(json[key].count);
        // }
        // if("Bottles" == json[key].template){
        //   values[2] += parseInt(json[key].count);
        // }
        // if("Layers" == json[key].template){
        //   values[3] += parseInt(json[key].count);
        // }
        // if("Pharma" == json[key].template){
        //   values[4] += parseInt(json[key].count);
        // }
        // if("Tubes" == json[key].template){
        //   values[5] += parseInt(json[key].count);
        // }
        console.log(temp);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  var data = {
    labels,
    datasets: [
      {
        data: values,
      },
    ],
  };

  const data2 = [
    {
      name: 'Bevergaes',
      population: 120,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Rice',
      population: 145,
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Bottles',
      population: 128,
      color: 'yellow',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Cakes',
      population: 180,
      color: 'blue',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Sugar',
      population: 73,
      color: '#ff6600',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Water',
      population: 200,
      color: 'rgb(0, 255, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'black',
          borderRadius: 10,
          paddingVertical: 20,
          paddingHorizontal: 4,
        }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <BarChart
            data={data}
            width={screenWidth - 50}
            height={220}
            chartConfig={chartConfig}
            fromZero={true}
            style={styles.graph}
          />
        )}
      </View>
      <View
        style={{
          backgroundColor: 'black',
          borderRadius: 10,
          paddingVertical: 20,
          paddingHorizontal: 4,
          marginTop: 50,
        }}>
        <PieChart
          data={data2}
          width={screenWidth - 50}
          height={190}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'5'}
          center={[10, 10]}
          absolute
        />
      </View>
    </View>
  );
}

const chartConfig = {
  backgroundColor: 'black',
  color: (opacity = 0.7) => `rgba(112, 219, 112, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

// Main App Screen section with tab navigation
function BottomNav(){
  return (
    
    
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Account') {
              iconName = focused ? 'construct' : 'construct';
            } else if (route.name === 'Graph') {
              iconName = focused ? 'bar-chart' : 'bar-chart';
            } else if (route.name === 'Home') {
              iconName = focused ? 'save' : 'save';
            } else if (route.name === 'Sub-Accounts') {
              iconName = focused ? 'people' : 'people';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            height: 78,
            backgroundColor: '#2eb82e',
          },
        })}>
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            headerStyle: {
              backgroundColor: '#2eb82e',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Tab.Screen
          name="Sub-Accounts"
          component={SubAccountsMainScreen}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#2eb82e',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Tab.Screen
          name="Home"
          component={FilesScreenMain}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#2eb82e',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Tab.Screen
          name="Graph"
          component={GraphScreen}
          options={{
            headerStyle: {
              backgroundColor: '#2eb82e',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Tab.Navigator>
   
    
  );
}
export default function App() {
  
  return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Food detail Management system',
              headerStyle: {
                backgroundColor: 'lightgreen',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                alignSelf: 'center',
                fontWeight: 'bold',
                color: 'white',
              },
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              title: 'Food detail Management system',
              headerLeft: () => <></>,
              headerStyle: {
                backgroundColor: 'lightgreen',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                alignSelf: 'center',
                fontWeight: 'bold',
                color: 'white',
              },
            }}
          />
          <Stack.Screen
            name="Profile"
            component={BottomNav}
            options={{
              headerShown:false,
              title: 'Food detail Management system',
              headerStyle: {
                backgroundColor: 'lightgreen',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                alignSelf: 'center',
                fontWeight: 'bold',
                color: 'white',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'lightgrey',
  },
  container_login: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'lightgreen',
    padding: 20,
    height: '100%',
  },
  container_account: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'lightgrey',
  },
  container_add: {
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
  },
  container_files: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    padding: 20,
    backgroundColor: 'lightgrey',
  },
  container_emp: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'lightgrey',
  },
  item_text: {
    fontSize: 20,
    color: 'black',
  },
  item_text2: {
    fontSize: 16,
    color: 'black',
  },
  font1: {
    margin: 10,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  label: {
    fontSize: 18,
    textAlign: 'start',
    color: 'white',
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
  },
  button_add: {
    backgroundColor: '#2eb82e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 10,
    width: '50%',
    alignSelf: 'center',
  },
  button_logout: {
    backgroundColor: '#ff5c33',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 10,
    width: '50%',
    alignSelf: 'center',
  },
  button_label: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'start',
    color: 'black',
    marginBottom: 30,
  },
  username: {
    fontSize: 22,
    textAlign: 'start',
    color: 'black',
  },
  empname: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  empemail: {
    fontSize: 18,
  },
  empbox: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 20,
    margin: 6,
    borderRadius: 16,
    elevation: 10,
    shadowColor: 'grey',
    shadowOffset: 30,
    shadowOpacity: 1,
  },
  scrollview: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'lightgreen',
    padding: 10,
    height: '100%',
    width: '100%',
    marginBottom: 30,
  },
  loginheading: {
    marginHorizontal: 10,
    marginBottom: 30,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  logincontainer: {
    justifyConten: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  logintextinput: {
    borderColor: 'black',
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
  },
  loginbtn: {
    borderWidth: 1,
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 10,
    backgroundColor: 'mediumseagreen',
    borderColor: 'mediumseagreen',
  },
  loginbtntext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logincontbottom: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  divider: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.25,
    marginHorizontal: 15,
  },
  profilecontainer: {
    backgroundColor: 'white',
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
});
