import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EventCard = ({ event }) => {
  return (
    <TouchableOpacity style={styles.eventCard}>
      <View style={styles.eventHeader}>
        {event.important && <View style={styles.importantBadge}><Text style={styles.importantText}>Important</Text></View>}
        <Text style={styles.categoryLabel}>{event.category.toUpperCase()}</Text>
      </View>
      
      <View style={styles.eventContent}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDate}>{event.date}</Text>
          <Text style={styles.eventLocation}>
            <Ionicons name="location-outline" size={14} color="#777" /> {event.location}
          </Text>
          <Text style={styles.eventDescription} numberOfLines={2}>
            {event.description}
          </Text>
        </View>
        <Image source={{ uri: event.image }} style={styles.eventImage} />
      </View>
      
      <View style={styles.eventActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={18} color="#2C7E7B" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={18} color="#2C7E7B" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="calendar-outline" size={18} color="#2C7E7B" />
          <Text style={styles.actionText}>Add to Calendar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  importantBadge: {
    backgroundColor: '#FFE9E8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  importantText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: '500',
  },
  categoryLabel: {
    color: '#777',
    fontSize: 12,
  },
  eventContent: {
    flexDirection: 'row',
  },
  eventInfo: {
    flex: 1,
    paddingRight: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  eventDate: {
    color: '#2C7E7B',
    fontSize: 14,
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 13,
    color: '#777',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  eventImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  eventActions: {
    flexDirection: 'row',
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    fontSize: 12,
    color: '#2C7E7B',
    marginLeft: 4,
  },
});

export default EventCard;