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
	 * Stores multiple participants, requires name and activity_session_id
	 *
	 * @param $activity_id
	 * @param $session_id
	 * @return mixed
	 */
	public function storeMultiple($activity_id, $session_id)
	{
		$input = Input::all();

		return $this->participant->storeMultiple($session_id, $input['names']);
	}

}