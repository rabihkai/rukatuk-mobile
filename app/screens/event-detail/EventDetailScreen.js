import React, { Component } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import Button from 'apsl-react-native-button'

import appStyles, { theme, navigatorStyle } from '../../config/styles';
import { images } from '../../config/images';
import { screens } from '../../config/screens';
import styles from './styles';

export default class EventDetailScreen extends Component {
  static navigatorStyle = navigatorStyle;

  constructor(props) {
    super(props);
  }

  _onGetTicketsButtonPressed(event) {
    return Linking.openURL(event.vanityUrl);
  }

  _onPressEventDescription(event) {
    this.props.navigator.push({
      screen: screens.eventDescription,
      passProps: { event }
    });
  }

  render() {
    let event = this.props.event;
    let startDateText = Moment(event.startDate).format('ddd, D MMM YYYY @ hh:mm a');
    let endDateText = Moment(event.endDate).format('hh:mm a');
    let latitude = Number.parseFloat(event.venue.latitude);
    let longitude = Number.parseFloat(event.venue.longitude);
    let showGetTicketsButton = new Date(this.props.event.startDate) > new Date();
    return (
      <View style={appStyles.container}>
        <ScrollView>
          <View style={appStyles.card}>
            <Image
              source={{ uri: event.imageUrl }}
              resizeMode='cover'
              style={{
                flex: 1,
                height: 210,
                width: undefined
              }} >
            </Image>
            <View style={{ padding: 10 }}>
              <Text style={{
                color: theme.colours.light,
                fontSize: 18,
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                {event.name}
              </Text>
            </View>
          </View>

          <View style={[
            appStyles.card,
            {
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16
            }
          ]}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon name="calendar-o" style={[
                appStyles.p,
                {
                  marginRight: 12,
                  fontSize: 22
                }
              ]}></Icon>
              <Text style={appStyles.p}>
                {startDateText} - {endDateText}
              </Text>
            </View>

            <View style={styles.separator} />

            <Text
              style={appStyles.p}
              ellipsizeMode={"tail"}
              numberOfLines={6}>
              {event.descriptionText}
            </Text>

            <View style={styles.separator} />

            <TouchableWithoutFeedback
              onPress={() => this._onPressEventDescription(event)}
              style={{flex: 1}}>
              <View>
                <Text
                  textAlign='center'
                  style={{
                    color: theme.colours.primary,
                    fontSize: 15,
                    marginTop: 2
                  }}>
                  Learn more
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={[
            appStyles.card,
            {
              marginBottom: 70
            }
          ]}>
            <MapView
              style={{
                height: 200
              }}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.010,
              }}
              zoomEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              pitchEnabled={false}
            >
              <MapView.Marker
                image={images.icons.mapMarker}
                coordinate={{
                  latitude: latitude,
                  longitude: longitude
                }}
                centerOffset={{x: 0, y: -25}}
              />
            </MapView>
            <View style={{ padding: 10 }}>
              <Text style={[
                appStyles.p,
                {
                  fontWeight: 'bold'
                }
              ]}>
                {event.venue.name}
              </Text>
              <Text style={appStyles.p}>
                {event.venue.addressLine1}
              </Text>
              <Text style={appStyles.p}>
                {event.venue.city}, {event.venue.postalCode}
              </Text>
              <Text style={appStyles.p}>
                {event.venue.country}
              </Text>
            </View>
          </View>
        </ScrollView>

        {
          showGetTicketsButton &&
          (
            <View style={styles.footer}>
              <View style={{ flex: 0.4 }} />
              <View style={{
                flex: 0.6,
                alignContent: 'center'
              }}>
                <Button
                  style={styles.button}
                  textStyle={styles.buttonText}
                  onPress={() => this._onGetTicketsButtonPressed(event)}>
                  Get Tickets
              </Button>
              </View>
            </View>
          )
        }
      </View>
    );
  }
}