import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from "./services/api";

export default function App() {
    const [ projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {

        const response = await api.post('projects',{
            title: `novo projeto ${Date.now()}`,
            owner: 'rafa paiva'
        });

        const project = response.data;

        setProjects([...projects, project])

    }

    return ( 
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>

    <SafeAreaView style={styles.container}>
    <FlatList 
        data={projects}
        keyExtractor={ project => project.id}
        renderItem={ ({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
        )}  
    />

    <TouchableOpacity 
    activeOpacity={0.6} 
    style={styles.button} 
    onPress={handleAddProject}
    >
            <Text style={styles.textButton}>Adicionar Projeto</Text>
    </TouchableOpacity>

    </SafeAreaView>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7159c1",
    },
    project: {
        color: "#fff",
        fontSize: 28,
    },
    button: {
        backgroundColor: "#fff",
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    textButton: {
        fontWeight: "bold",
        fontSize: 16,
    }
});