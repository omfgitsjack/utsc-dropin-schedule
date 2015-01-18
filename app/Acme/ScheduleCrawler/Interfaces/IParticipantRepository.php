<?php namespace Acme\Schedule\Interfaces;



Interface IParticipantRepository {

    public function getByActivitySessionId($activity_session_id);

    public function storeMultiple($activity_session_id, $names);

    public function storePhoneNumber($activity_session_id, $phone_number);

}