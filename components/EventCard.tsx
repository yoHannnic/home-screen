import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EventCard = ({ event }) => {
  return (
    <TouchableOpacity style={styles.eventCard} activeOpacity={0.85}>
      <View style={styles.eventHeader}>
        {event.important && (
          <View style={styles.importantBadge}>
            <Text style={styles.importantText}>Important</Text>
          </View>
        )}
        <Text style={styles.categoryLabel}>{event.category.toUpperCase()}</Text>
      </View>

      <View style={styles.eventContent}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDate}>
            <Ionicons name="calendar-outline" size={14} color="#2C7E7B" /> {event.date}
          </Text>
          <Text style={styles.eventLocation}>
            <Ionicons name="location-outline" size={14} color="#2C7E7B" /> {event.location}
          </Text>
          <Text style={styles.eventDescription} numberOfLines={2}>
            {event.description}
          </Text>
        </View>
        <Image
          source={{ uri: event.image }}
          style={styles.eventImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.eventActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={16} color="#2C7E7B" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={16} color="#2C7E7B" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="calendar" size={16} color="#2C7E7B" />
          <Text style={styles.actionText}>Add</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    transitionDuration: '0.3s', // Smooth transition for hover effect
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  importantBadge: {
    backgroundColor: '#FFECEC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  importantText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  eventContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventInfo: {
    flex: 1,
    paddingRight: 10,
  },
  eventTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    color: '#1C1C1E',
  },
  eventDate: {
    fontSize: 13.5,
    color: '#2C7E7B',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 13,
    color: '#2C7E7B',
    marginBottom: 6,
  },
  eventDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginBottom: 12,
  },
  eventImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginLeft: 12,
  },
  eventActions: {
    flexDirection: 'row',
    marginTop: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F0F4F5',
    transitionDuration: '0.3s', // For hover effect on buttons
  },
  actionText: {
    fontSize: 12.5,
    color: '#2C7E7B',
    marginLeft: 5,
  },
  // Add hover effect styles (for web or gesture libraries that support hover)
  actionButtonHover: {
    backgroundColor: '#D1E8E2',
  },
});

export default EventCard;