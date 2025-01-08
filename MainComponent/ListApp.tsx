import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ListItem as RNEListItem, Avatar, Icon } from '@rneui/themed';
import Modal from 'react-native-modal';

// Define the type for list items
interface ListItem {
  name: string;
  subtitle: string;
  avatar_url: string;
}

const ListApp = () => {
  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);

  const list2: ListItem[] = [
    {
      name: 'John Doe',
      subtitle: 'Software Engineer',
      avatar_url: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Jane Smith',
      subtitle: 'Product Manager',
      avatar_url: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      name: 'Alice Johnson',
      subtitle: 'UX Designer',
      avatar_url: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  ];

  const handleItemPress = (item: ListItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNEListItem.Accordion
        containerStyle={styles.accordionContainer}
        content={
          <>
            <RNEListItem.Content>
              <RNEListItem.Title style={styles.accordionTitle}>
                List Accordion
              </RNEListItem.Title>
            </RNEListItem.Content>
            <Icon name="list" size={30} color="#6200EE" />
          </>
        }
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        {list2.map((item, index) => (
          <RNEListItem
            key={index}
            bottomDivider
            containerStyle={styles.listItemContainer}
            onPress={() => handleItemPress(item)}
          >
            <Avatar
              title={item.name[0]}
              source={{ uri: item.avatar_url }}
              rounded
              size="small"
            />
            <RNEListItem.Content>
              <RNEListItem.Title style={styles.listItemTitle}>
                {item.name}
              </RNEListItem.Title>
              <RNEListItem.Subtitle style={styles.listItemSubtitle}>
                {item.subtitle}
              </RNEListItem.Subtitle>
            </RNEListItem.Content>
            <RNEListItem.Chevron color="#6200EE" />
          </RNEListItem>
        ))}
      </RNEListItem.Accordion>

      {/* Modal for Tooltip */}
      <Modal
       isVisible={modalVisible}
       onBackdropPress={() => setModalVisible(false)}
       onSwipeComplete={() => setModalVisible(false)}
       swipeDirection="down" // Allow only downward swipe
       style={styles.modalContainer}
       propagateSwipe 
      >
        <View style={styles.modalContent}>
          {selectedItem && (
            <>
              <Image
                source={{ uri: selectedItem.avatar_url }}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>{selectedItem.name}</Text>
              <Text style={styles.modalSubtitle}>{selectedItem.subtitle}</Text>
            </>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingHorizontal: 10 },
  accordionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginVertical: 10,
    elevation: 5,
  },
  accordionTitle: { fontSize: 18, fontWeight: 'bold', color: '#6200EE' },
  listItemContainer: {
    backgroundColor: '#FFF',
    marginVertical: 5,
    borderRadius: 8,
    elevation: 3,
  },
  listItemTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  listItemSubtitle: { fontSize: 14, color: '#555' },
  modalContainer: { justifyContent: 'flex-end', margin: 0 },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  modalSubtitle: { fontSize: 14, color: '#555', marginBottom: 20 },
  closeButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default ListApp;
