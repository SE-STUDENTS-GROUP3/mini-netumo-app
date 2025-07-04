import AlertBadge from '@/components/ui/AlertBadge'
import { Link, useNavigate } from 'react-router-dom'
import { FiExternalLink } from 'react-icons/fi'
import Button from '@/components/ui/Button'
import { deleteTarget } from '@/services/targetService'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface TargetCardProps {
  target: Target
}

export default function TargetCard({ target }: TargetCardProps) {
  const latestLog = target.logs?.[0]

  const status =
    latestLog?.status === 'UP' ? 'up' : latestLog?.status === 'DOWN' ? 'down' : 'warning'

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      await deleteTarget(target.id)
      toast.success('Target deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['targets'] })
    } catch (error) {
      toast.error('Failed to delete target')
      console.error(error)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between min-h-[220px] relative hover:shadow-lg transition">
      {/* Top section with name, url, and status badge */}
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold truncate">
            <Link to={`/targets/${target.id}`} className="hover:text-primary-600">
              {target.name}
            </Link>
          </h3>
          <a
            href={target.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-primary-500 inline-flex items-center break-all"
          >
            {target.url}
            <FiExternalLink className="ml-1" />
          </a>
        </div>
        <AlertBadge status={status} />
      </div>

      {/* Info section */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Last checked</p>
          <p className="font-medium">
            {latestLog?.createdAt ? new Date(latestLog.createdAt).toLocaleString() : '--'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Response time</p>
          <p className="font-medium">{latestLog?.latencyMs ? `${latestLog.latencyMs} ms` : '--'}</p>
        </div>
      </div>

      {/* Button section */}
      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="outline" onClick={() => navigate(`/targets/edit/${target.id}`)}>
          Edit
        </Button>
      </div>
    </div>
  )
}
