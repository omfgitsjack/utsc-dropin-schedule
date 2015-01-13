<?php

use Acme\Schedule\Interfaces\IParticipantRepository;

class ParticipantsController extends \BaseController {

	protected $participant;

	/**
	 * Dependency Injection
	 *
	 * @param IParticipantRepository $participantRepository
     */
	function __construct(IParticipantRepository $participantRepository)
	{
		$this->participant = $participantRepository;
	}

	/**
	 * Stores one participant, requires name and activity_session_id
	 *
	 * @param $participant
	 * @return mixed
     */
	public function storeOne($activity_id, $session_id)
	{
		$input = Input::all();

		return $this->participant->storeOne($session_id, $input['name']);
	}
}