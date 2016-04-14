/*
jshint -W117, -W098, -W116, -W003, -W026
*/
(function() {
  'use strict';

  angular
        .module('openmrs-ngresource.restServices')
        .factory('OpenmrsRestService', OpenmrsRestService);

  OpenmrsRestService.$inject = ['SessionResService',
                                'AuthService',
                                'PatientResService',
                                'UserResService',
                                'EncounterResService',
                                'LocationResService',
                                'ProviderResService',
                                'ObsResService',
                                'DrugResService',
                                'PatientResRelationshipService'];

  function OpenmrsRestService(session, authService, PatientResService,
              UserResService, EncounterResService, LocationResService,
              ProviderResService, ObsResService, DrugResService,PatientResRelationshipService) {
    var service = {
          getSession: getSession,
          getAuthService: getAuthService,
          getPatientService: getPatientService,
          getUserService: getUserService,
          getLocationResService: getLocationService,
          getEncounterResService: getEncounterService,
          getProviderResService:getProviderResService,
          getObsResService:getObsResService,
          getDrugResService:getDrugResService,
          getPatientRelationshipService:getPatientRelationshipService
        };

    return service;

    function getSession() {
      return session;
    }

    function getAuthService() {
      return authService;
    }

    function getPatientService() {
      return PatientResService;
    }

    function getPatientRelationshipService() {
      return PatientResRelationshipService;
    }

    function getUserService() {
      return UserResService;
    }

    function getEncounterService() {
      return EncounterResService;
    }

    function getLocationService() {
      return LocationResService;
    }

    function getProviderResService() {
      return ProviderResService;
    }

    function getObsResService() {
      return ObsResService;
    }

    function getDrugResService() {
      return DrugResService;
    }

    function getUserDefaultPropertiesService() {
      return UserDefaultPropertiesService;
    }
  }
}) ();
