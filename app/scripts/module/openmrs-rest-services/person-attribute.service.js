/*
 jshint -W026, -W116, -W098, -W003, -W068, -W069, -W004, -W033, -W030, -W117
 */
/*
 jscs:disable disallowQuotedKeysInObjects, safeContextKeyword, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
 */
(function () {
  'use strict';

  angular
    .module('openmrs-ngresource.restServices')
    .factory('PersonAttributeResService', PersonAttributeResService);

  PersonAttributeResService.$inject = ['OpenmrsSettings', '$resource'];

  function PersonAttributeResService(OpenmrsSettings, $resource) {
    var service = {
      getPersonAttributeByUuid: getPersonAttributeByUuid,
      saveUpdatePersonAttribute: saveUpdatePersonAttribute,
      voidPersonAttribute: voidPersonAttribute
    };

    return service;

    function getResource() {
      var v = 'full';
      return $resource(OpenmrsSettings.getCurrentRestUrlBase().trim() + 'person/:uuid/attribute',
        {uuid: '@uuid', v: v},
        {query: {method: 'GET', isArray: false}});
    }

    function saveUpdatePersonAttribute(personAttribute, successCallback, errorCallback) {
      var personAttributeResource = getResource();
      var uuid = personAttribute.uuid;
      delete personAttribute['uuid'];
      personAttributeResource.save({ uuid: uuid },personAttribute).$promise
        .then(function (data) {
          successCallback(data);
        })
        .catch(function (error) {
          console.error('An Error occured when saving PersonAttribute ', error);
          if (typeof errorCallback === 'function')
            errorCallback('Error processing request', error);
        });

    }

    function getPersonAttributeByUuid(personAttribute, successCallback, errorCallback) {
      var personAttributeResource = getResource();

      return personAttributeResource.get({uuid: personAttribute.uuid}).$promise
        .then(function (data) {
          successCallback(data);
        })
        .catch(function (error) {
          console.error('An Error occured when getting PersonAttribute ', error);
          if (typeof errorCallback === 'function')
            errorCallback('Error processing request', error);
        });
    }

    function voidPersonAttribute(personAttribute, successCallback, errorCallback) {
      var personAttributeResource = getResource();
      personAttributeResource.delete({uuid: personAttribute.uuid},
        function (data) {
          if (successCallback) {
            successCallback(data);
          } else return data;
        },

        function (error) {
          console.error('An Error occured when voiding PersonAttribute ', error);
          if (typeof errorCallback === 'function')
            errorCallback('Error processing request', error);
        }
      );
    }

  }
})();
