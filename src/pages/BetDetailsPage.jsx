import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io"
import { useQuotteryContext } from '../contexts/QuotteryContext'
import Card from '../components/qubic/Card'
import QubicCoin from "../assets/qubic-coin.svg"
import { formatQubicAmount, truncateMiddle } from '../components/qubic/util'
import LabelData from '../components/LabelData'
import { useQubicConnect } from '../components/qubic/connect/QubicConnectContext'
import ConfirmTxModal from '../components/qubic/connect/ConfirmTxModal'
import { sumArray } from '../components/qubic/util'

function BetDetailsPage() {
  const { id } = useParams()
  const { state } = useQuotteryContext()
  const [showConfirmTxModal, setShowConfirmTxModal] = useState(false)
  const bet = state.bets.find(bet => bet.bet_id === parseInt(id))
  const [selectedOption, setSelectedOption] = useState(null)
  const [amountOfBetSlots, setAmountOfBetSlots] = useState(0)
  const [optionCosts, setOptionCosts] = useState(0)
  const [detailsViewVisible, setDetailsViewVisible] = useState(false)
  const { connected, toggleConnectModal, signTx } = useQubicConnect()

  const navigate = useNavigate()

  const updateAmountOfBetSlots = (value) => {
    // check if value is not less than 1 and not greater than max_slot_per_option
    if (value < 1 || value > bet.max_slot_per_option) return
    // valid value
    setOptionCosts(value * bet.amount_per_bet_slot)
    setAmountOfBetSlots(value)
  }

  const calcPercentage = (value, total) => (value / total) * 100
  const toggleDetailsView = () => setDetailsViewVisible(!detailsViewVisible)
  const incAmountOfBetSlots = () => updateAmountOfBetSlots(amountOfBetSlots + 1)
  const decAmountOfBetSlots = () => updateAmountOfBetSlots(amountOfBetSlots - 1)

  const BetOptionCosts = ({costs}) => {
    const [fontSize, setFontSize] = useState('text-[25px]')

    const costsStr = formatQubicAmount(costs)

    useEffect(() => {
      if (costsStr.length >= 14) {
        setFontSize('text-[15px]')
      } else if (costsStr.length >= 11) {
        setFontSize('text-[20px]')
      } else {
        setFontSize('text-[25px]') // Default font size
      }
    }, [costsStr])

    return (<>
      <span className={`${fontSize} text-primary-40 block`}>
        {costsStr}
      </span>
      <span className='text-[14px] text-gray-50 mt-[-5px]'>
        QUBIC
      </span>
    </>)
  }

  const calculateOptionPercentage = (b, idx) => {
    // check if b.current_num_selection is not all 0
    if (b.current_num_selection.every(num => num === 0)) return ''
    // valid value
    return `(
      ${b.current_num_selection[idx]} /
      ${calcPercentage(b.current_num_selection[idx], sumArray(b.current_num_selection)).toFixed(2)}
    %)`
  }

  return (
    <div className='sm:px-30 md:px-130'>
      {!bet && <div className='text-center mt-[105px] text-white'>Loading...</div>}

      {bet && bet.bet_id >= 0 && <>

        <div className='mt-[10px] px-5 sm:px-20 md:px-100'>
          <div className='p-5 bg-gray-70 mt-[105px] mb-9 rounded-[8px] text-center text-[35px] text-white'>
            {bet.bet_desc}
          </div>
          <Card className='p-[24px] w-full'>
            <div className='flex flex-col items-start justify-start gap-4'>
              <div className='grid grid-cols-2 md-grid-cols-3 justify-between items-center w-full'>
                <LabelData lbl="Bet closes at" value={bet.close_date + ' ' + bet.close_time.slice(0, -3) + ' UTC'} />
                <LabelData lbl="Slots taken" value={sumArray(bet.current_num_selection)} />
                <LabelData lbl="Fee %" value={sumArray(bet.oracle_fee) + ' %'} />
                <LabelData lbl="Burning" value={'2 %'} />
              </div>
              <div className=' flex flex-col justify-center items-center size-full'>
                <span className=' text-gray-50 text-[12px] leading-[16px]'>
                  In the pot
                </span>
                <div className=' gap-[12px] flex justify-center items-center'>
                  <img src={QubicCoin} alt='Icon of a Qubic coin' />
                  <span className='text-white text-[18px] leading-[23px]'>
                    {formatQubicAmount(bet.current_total_qus)} QUBIC
                  </span>
                </div>
              </div>

              {detailsViewVisible && <div className='w-full'>
                <div className='grid md:grid-cols-3'>
                  <LabelData lbl='Open' value={bet.open_date + ' ' + bet.open_time + ' UTC'} />
                  <LabelData lbl='Close' value={bet.close_date + ' ' + bet.close_time + ' UTC'} />
                  <LabelData lbl='End' value={bet.end_date + ' ' + bet.end_time + ' UTC'} />
                </div>
                <LabelData lbl='Creator' value={truncateMiddle(bet.creator, 40)} />
                <LabelData lbl='Oracle Provider(s)' value={bet.oracle_id.map((id, index) => (
                  <span className='block' key={index}>{truncateMiddle(id, 40)}</span>
                ))} />
              </div>}

              <button className='flex w-full items-center text-14 text-primary-40'
                onClick={() => toggleDetailsView()}
              >
                <span className='flex-1'></span>
                <IoIosArrowDown className={'flex-none mr-1 ' + (detailsViewVisible ? 'transform rotate-180' : '')} />
                <span className='flex-none'>Details</span>
              </button>
            </div>
          </Card>

          {/*
            Bet still open for betting, choose a option.
          */}
          {bet && bet.result === -1 && bet.is_active &&
            <Card className='p-[24px] w-full mt-[16px]'>
              <span className='font-space text-gray-50 text-[12px] leading-[16px] mb-3 block'>
                Decide for your bet
              </span>
              {bet.option_desc && bet.option_desc.map((option, index) => {
                return (
                  <div className='flex items-center gap-4' key={index}>
                    <button
                      key={index}
                      className={'py-[8px] px-[16px] mb-2 text-[14px] font-space rounded-[8px] w-full ' +
                        (selectedOption === index ? 'bg-success-40' : 'bg-primary-40')
                      }
                      onClick={() => setSelectedOption(index)}
                    >
                      {option} {calculateOptionPercentage(bet, index)}
                    </button>
                    <span className='text-white text-[16px] leading-[24px]'>
                      {Number(bet.betting_odds[index]).toFixed(2)}
                    </span>
                  </div>
                )
              })}
            </Card>
          }

          {/*
            We already have a result for this bet.
          */}
          {bet && bet.result !== -1 &&
            <Card className='p-[24px] w-full mt-[16px]'>
              <span className='font-space text-gray-50 text-[12px] leading-[16px] mb-3 block'>
                Bet Result
              </span>
              {bet.option_desc && bet.option_desc.map((option, index) => {
                return (
                  <div className='flex items-center gap-4 w-full' key={index}>
                    <span className={'py-[8px] px-[16px] mb-2 text-[14px] font-space rounded-lg w-full ' +
                      (bet.result === index ? 'bg-success-40' : 'bg-grey')}
                    >
                      {option} {calculateOptionPercentage(bet, index)}
                    </span>
                    <span className='text-white text-[16px] leading-[24px]'>
                      {Number(bet.betting_odds[index]).toFixed(2)}
                    </span>
                  </div>
                )
              })}
            </Card>
          }

          {/*
            We have no result for this bet.
          */}
          {bet && bet.result === -1 && !bet.is_active &&
            <Card className='p-[24px] w-full mt-[16px]'>
              <span className='font-space text-gray-50 text-[12px] text-center leading-[16px] block'>
                We have no result for this bet yet.
              </span>
            </Card>
          }

          {selectedOption === null && <div className='mb-40'></div>}
          {selectedOption !== null &&
            <Card className='p-[24px] w-full mt-[16px] mb-40'>
              <span className=' font-space text-gray-50 text-[12px] leading-[16px] block mb-3'>
                How many Bet Slots you want to buy?
              </span>
              <div className='grid'>
                <button
                  className='bg-[rgba(26,222,245,0.1)] text-primary-40 text-20 font-bold py-3'
                  onClick={incAmountOfBetSlots}
                >+</button>
                <input
                  className='py-3 text-[25px] text-center'
                  type='number'
                  value={amountOfBetSlots}
                  onChange={(e) => updateAmountOfBetSlots(e.target.value)}
                />
                <button
                  className='bg-[rgba(26,222,245,0.1)] text-primary-40 text-20 font-bold py-3'
                  onClick={decAmountOfBetSlots}
                >-</button>
              </div>
              <span
                className='font-space text-gray-50 text-[12px] leading-[16px] block mt-3 text-right'
              >
                Price per slot: {formatQubicAmount(bet.amount_per_bet_slot)} QUBIC
              </span>
              <span
                className='font-space text-gray-50 text-[12px] leading-[16px] block mt-3 text-right underline cursor-pointer'
                onClick={() => updateAmountOfBetSlots(bet.max_slot_per_option)}
              >
                Go for Max ({bet.max_slot_per_option})
              </span>
            </Card>
          }
        </div>

        {/** Bet Now button */}
        <div className='
          fixed h-[78px] flex w-full z-5 bottom-0 gap-3
          border-t border-solid border-gray-70 bg-gray-90
        '>
          <button className='bg-[rgba(26,222,245,0.1)] flex-none py-[8px] px-[16px] text-18 text-primary-40 font-space'
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <div className='flex-1 flex flex-col justify-center text-center'>
            <BetOptionCosts costs={optionCosts} />
          </div>
          <button
            className='flex-none bg-primary-40 py-[8px] px-10 text-18 disabled:bg-slate-50 disabled:text-gray-50'
            onClick={() => {
              if(connected) {
                setShowConfirmTxModal(true)
              }else{
                toggleConnectModal()
              }
            }}
            disabled={optionCosts === 0}
          >
            {connected ? 'Bet!' : 'Bet!'}
          </button>

          <ConfirmTxModal
            open={showConfirmTxModal}
            onClose={() => setShowConfirmTxModal(false)}
            tx={{
              title: 'Bet Now',
              description: 'Are you sure you want to bet now?'
            }}
            onConfirm={async () => {
              const confirmed = await signTx({
                betId: bet.bet_id,
                betOption: selectedOption,
                numberOfSlots: amountOfBetSlots,
                amountPerSlot: bet.amount_per_bet_slot
              })
              return confirmed
            }}
          />
        </div>
      </>}
    </div>
  )
}

export default BetDetailsPage
